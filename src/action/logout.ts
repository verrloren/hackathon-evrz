'use server';


type DataType = {
	success: boolean;
	response: string;
}


 export const logout = async () => {


		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/users/logout `, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.BACKEND_API_KEY as string
				},
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
			console.error(error)
		}
 }