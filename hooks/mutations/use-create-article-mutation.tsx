import { useMutation } from '@tanstack/react-query';
import { StringMappingType } from 'typescript';
import axios from "../../helpers/axios";

type Payload = {
    title: string;
    content: string;
    category_id: string;
    featured_image: File;
}

type Response = any;

const action = async (payload: Payload): Promise<Response> => { 
    const token = localStorage.getItem('access_token');
    const form = new FormData()
    form.append('title', payload.title)
    form.append('content', payload.content)
    form.append('category_id', payload.category_id)
    form.append('featured_image', payload.featured_image)
    
    const res = await axios.post('/me/articles', form, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'multipart/form-data',
            
        }
    });
    return res.data.data
}

const useCreateArticleMutation = () => {
    return useMutation(action);
};

export default useCreateArticleMutation;
