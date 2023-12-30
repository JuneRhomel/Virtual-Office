import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setData } from "../../redux/dataSlice";
export default function fetchData() {
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.token.value);
    const returnData = useSelector((state: any) => state.GetData.value);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await fetch('http://localhost:3000/get_data/_user',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Dispatch the action to set data in Redux store
                dispatch(setData(data.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchDataFromApi();
    }, []); 
    return (returnData)
}