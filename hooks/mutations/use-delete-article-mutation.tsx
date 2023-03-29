import { useMutation } from '@tanstack/react-query';
import { StringMappingType } from 'typescript';
import axios from "../../helpers/axios";



type Response = any
type Payload = {
    id: number;
};

const action = async (payload:Payload): Promise<Response> => {
    const token = localStorage.getItem("access_token")
    const res = await axios.delete(`/me/articles/${payload.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data.data
}

const useDeleteArticleMutation = () => {
    return useMutation(action);
};

export default useDeleteArticleMutation;
