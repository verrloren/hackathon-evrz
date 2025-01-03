'use server';

import * as z from "zod";
import { RegisterSchema } from "../schemas";

type DataType = {
	success: boolean;
	response: string;
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validatedFields.data;


	try {
		const result = await fetch(`${process.env.BACKEND_API_URL}/api/users/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'API-Key': process.env.BACKEND_API_KEY as string
			},
			body: JSON.stringify({ name, email, password })
		})

		const { success, response } = await result.json();



		
		const data: DataType = {
			success,
			response
		}

		if(!success || !response) {
			return data
		}

		return data;

	} catch (error) {
		console.error(error);
		return { error: "Failed to create user" }
	}
}