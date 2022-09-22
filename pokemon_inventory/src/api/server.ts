let token = `9ddcf0f2fe47adc22504c6ce7570aeadef2cf00aa140b7c7`

export const serverCalls= {
    get: async () => {
        const response = await fetch (`https://pokemon1homework.herokuapp.com/api/pokemon`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async(data:any) => {
        const response = await fetch(`https://pokemon1homework.herokuapp.com/api/pokemon`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },
    update: async(id:string, data:any) => {
        const response = await fetch(`https://pokemon1homework.herokuapp.com/api/pokemon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error(`Failed to Update Pokemon Id ${id} on server`)
        }
        return await response.json()
    },
    delete: async(id:string) => {
        const response = await fetch(`https://pokemon1homework.herokuapp.com/api/pokemon/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error(`Failed to Delete Pokemon Id ${id} on server`)
        }
        return await response.json()
    }
}