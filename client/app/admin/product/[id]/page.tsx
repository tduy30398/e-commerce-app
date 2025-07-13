/* eslint-disable @next/next/no-img-element */
'use client';

import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ProductTypes } from '@/components/templates/NewArrivals';
import { ROUTES } from '@/lib/constants';

const getProductDetail = (url: string) => axiosInstance.get(url).then(res => res.data)

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    imageUrl: z.string().url('Image is required'),
    rating: z.string().min(1, 'Rating is required'),
    price: z.string().min(1, 'Price is required'),
    description: z.string().min(1, 'Description is required')
})

type FormData = z.infer<typeof formSchema>

const ProductDetail = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [preview, setPreview] = useState<string | null>(null)
    const [uploadPct, setUploadPct] = useState<number | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
            description: '',
            rating: '',
            price: '',
        }
    })

    const { error, isLoading } = useSWR(id !== 'create' ? `/api/product/${id}` : null,
        getProductDetail,
        {
            onSuccess: (data: ProductTypes) => {
                setValue('name', data.name)
                setValue('imageUrl', data.image)
                setValue('rating', String(data.rating))
                setValue('price', String(data.price))
                setValue('description', data.description)
                setPreview(data.image)
            },
            onError: (err) => {
                console.log(err)
            },
        }
    );

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', preset!)

            xhr.upload.onprogress = e => {
                if (e.lengthComputable) {
                    setUploadPct(Math.round((e.loaded / e.total) * 100))
                }
            }

            xhr.onload = () => {
                setUploadPct(null)
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText)
                    resolve(response.secure_url)
                } else {
                    reject(xhr.responseText)
                }
            }

            xhr.onerror = () => reject('Upload failed')
            xhr.open('POST', url)
            xhr.send(formData)
        })
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setPreview(URL.createObjectURL(file))

        try {
            const url = await uploadToCloudinary(file)
            setValue('imageUrl', url, { shouldValidate: true })
        } catch (err) {
            console.error(err)
            setValue('imageUrl', '', { shouldValidate: true })
        }
    }

    const onSubmit = async (data: FormData) => {
        try {
            const submitData = {
                price: Number(data.price),
                rating: Number(data.rating),
                description: data.description,
                image: data.imageUrl,
                name: data.name,
            };

            if (id !== 'create') {
                await axiosInstance.put(`/api/product/${id}`, submitData);
            } else {
                await axiosInstance.post('/api/product', submitData);
            }

            reset();
            setPreview(null);
            router.push(ROUTES.ADMINPRODUCT);
        } catch (err) {
            console.error(err);
            alert('Error has occurred');
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between">
                <h2 className='text-2xl font-bold'>Product Detail</h2>
                <Button type="submit" className='cursor-pointer' disabled={!!uploadPct}>
                    {id ? 'Update' : 'Create'}
                </Button>
            </div>
            <div className="flex gap-x-4">
                <div className='w-1/3'>
                    <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                    <Input className='mt-2' id="name" {...register('name')} />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                </div>
                <div className='w-1/3'>
                    <Label htmlFor="price">Price<span className="text-red-500">*</span></Label>
                    <Input type='number' className='mt-2' id="price" {...register('price')} />
                    {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
                </div>
                <div className='w-1/3'>
                    <Label htmlFor="rating">Rating<span className="text-red-500">*</span></Label>
                    <Input type='number' className='mt-2' id="rating" {...register('rating')} />
                    {errors.rating && <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>}
                </div>
            </div>
            <div className="flex gap-x-4">
                <div className='w-1/2'>
                    <Label htmlFor="image">Upload Image<span className="text-red-500">*</span></Label>
                    <Input className='mt-2 cursor-pointer' id="image" type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadPct !== null && <Progress value={uploadPct} className="mt-2" />}
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-4 w-64 h-64 object-cover rounded-lg mx-auto"
                        />
                    )}
                    {errors.imageUrl && (
                        <p className="text-sm text-red-600 mt-1">{errors.imageUrl.message}</p>
                    )}
                </div>
                <div className='w-1/2'>
                    <Label htmlFor="description">Description<span className="text-red-500">*</span></Label>
                    <Textarea className='mt-2 min-h-[308px]' id="description" {...register('description')} />
                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
                </div>
            </div>
        </form>
    )
}

export default ProductDetail