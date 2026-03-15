export async function login(agentCode, password) {
    try {
        const res = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentCode, password })
        })

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data;

    } catch (error) {
        return null
    }
}


export async function getCurrentUser() {
    try {
        const res = await fetch("http://localhost:3000/me", {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem("token")},
        })

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data;

    } catch (error) {
        return null
    }
}

export async function sendReport(newReport) {
    try {
        const res = await fetch("http://localhost:3000/reports", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem("token"),
                 'Content-Type': 'application/json'},
            body: JSON.stringify(newReport)
        })

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data;

    } catch (error) {
        return null
    }
}


export async function getAllReports(){
    try{
        const token = localStorage.getItem('token')
        const res = await fetch("http://localhost:3000/reports", {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`
            }
        })

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data;

    }catch(error){
       return null
    }
}

