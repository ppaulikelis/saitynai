export interface SignUpType {
	email: string;
	password: string;
}

export interface SignInType {
	email: string;
	password: string;
}

export interface UserType {
	id: number;
	email: string;
	role: string;
}

export interface ErrorResponseType {
	status: number;
	message: string;
}

export interface PostType {
	id: number;
	title: string;
	description: string;
	date: Date;
	content: string;
	editorId: number;
	lastEditorId: number;
	lastEditedDate: Date;
}

export interface GenderType {
	id: number;
	name: string;
}

export interface BtaDescriptionType {
	id: number;
	name: string;
	abbreviation: string;
	unit: string;
}

export interface MedicalCardType {
	id?: number;
	name: string;
	surname?: string;
	genderId: number;
	birthDate: string;
}

export interface BloodTestType {
	id?: number;
	date: string;
	medicalCardId?: number;
}

export interface BloodTestAnalyteType {
	id?: number;
	value: number;
	bloodTestId?: number;
	bloodTestAnalyteDescriptionId: number;
}

export interface EditorType {
	id?: number;
	email: string;
	password: string;
	role?: string;
}
