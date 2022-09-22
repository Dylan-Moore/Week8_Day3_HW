import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName, chooseType, chooseHeight, chooseWeight, chooseMoveset } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { TextField } from '@mui/material';
import { List } from 'reselect/es/types';

interface PokemonFormProps{
    id?:string;
    data?: {};
}

interface PokemonState{
    name: string,
    type: string,
    height: string,
    weight: string,
    moveset: List
}

export const PokemonForm = (props:PokemonFormProps) => {
    const dispatch = useDispatch();
    let { pokemonData, getData } = useGetData()
    const store = useStore()
    const name = useSelector<PokemonState>(state => state.name)
    const type = useSelector<PokemonState>(state => state.type)
    const height = useSelector<PokemonState>(state => state.height)
    const weight = useSelector<PokemonState>(state => state.weight)
    const moveset = useSelector<PokemonState>(state => state.moveset)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async(data:any, event:any) => {
        console.log(props.id)

        if ( props.id! ){
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset()
        }
        else{
            dispatch(chooseName(data.name))
            dispatch(chooseType(data.type))
            dispatch(chooseHeight(data.height))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseMoveset(data.moveset))
            await serverCalls.create(store.getState())
            window.location.reload()
            event.target.reset()
        }
    }
    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Pokemon Name</label>
                    <Input {...register('name')} name="name" placeholder="name"/>
                </div>
                <div>
                    <label htmlFor="type">Pokemon Type</label>
                    <Input {...register('type')} name="type" placeholder="type"/>
                </div>
                <div>
                    <label htmlFor="height">Pokemon Height</label>
                    <Input {...register('height')} name="height" placeholder="height"/>
                </div>
                <div>
                    <label htmlFor="weight">Pokemon Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="weight"/>
                </div>
                <div>
                    <label htmlFor="moveset">Pokemon Moveset</label>
                    <Input {...register('moveset')} name="moveset" placeholder="moveset"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}