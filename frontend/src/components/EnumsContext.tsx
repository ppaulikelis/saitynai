import { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { createContext, ReactNode, useEffect, useState } from "react";
import EnumsService from "../services/EnumsService";
import { BtaDescriptionType, ErrorResponseType, GenderType } from "../Types";

interface Props {
	children?: ReactNode;
}

interface Value {
	genders: GenderType[];
	btaDescriptions: BtaDescriptionType[];
	getGender: (id: number) => GenderType;
	getBtaDescription: (id: number) => BtaDescriptionType;
}

export const EnumsContext = createContext<Value | null>(null);

export const EnumsProvider = ({ children }: Props) => {
	const { enqueueSnackbar } = useSnackbar();
	const [genders, setGenders] = useState(new Map());
	const [btaDescriptions, setBtaDescriptions] = useState(new Map());

	useEffect(() => {
		EnumsService.getGenders()
			.then((response: AxiosResponse) => {
				const gendersArr = response.data;
				const gendersMap = new Map(
					gendersArr.map((gender: GenderType) => [gender.id, gender])
				);
				setGenders(gendersMap);
			})
			.catch((error: AxiosError) => {
				const errorResponse = error.response?.data as ErrorResponseType;
				enqueueSnackbar(errorResponse.message, { variant: "error" });
			});

		EnumsService.getBtaDescriptions()
			.then((response: AxiosResponse) => {
				const btaDescriptionsArr = response.data;
				const btaDescriptionsMap = new Map(
					btaDescriptionsArr.map((description: BtaDescriptionType) => [
						description.id,
						description,
					])
				);
				setBtaDescriptions(btaDescriptionsMap);
			})
			.catch((error: AxiosError) => {
				const errorResponse = error.response?.data as ErrorResponseType;
				enqueueSnackbar(errorResponse.message, { variant: "error" });
			});
	}, []);

	const getGender = (id: number) => {
		return genders.get(id);
	};

	const getBtaDescription = (id: number) => {
		return btaDescriptions.get(id);
	};

	const gendersArr = Array.from(genders.values());
	const btaDescriptionsArr = Array.from(btaDescriptions.values());

	const value: Value = {
		genders: gendersArr,
		btaDescriptions: btaDescriptionsArr,
		getGender,
		getBtaDescription,
	};

	return (
		<EnumsContext.Provider value={value}>{children}</EnumsContext.Provider>
	);
};
