import axios from 'axios';

const fetchUserSubmissions = async (handle) => {
    const response = await axios.get("https://codeforces.com/api/user.status",{
        params: {
            handle: handle,
            count: 4000,
            from: 1,
        }
    });
    return response;
}

export default fetchUserSubmissions;