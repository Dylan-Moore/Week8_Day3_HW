import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
        DialogTitle } from '@mui/material';
import { PokemonForm } from '../../components/PokemonForm';
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      editable: true,
    },
    {
      field: 'height',
      headerName: 'Height',
      type: 'number',
      width: 110,
      editable:  true
    },
    {
      field: 'weight',
      headerName: 'Weight',
      type: 'number',
      width: 100,
      editable: true
    },
    {
      field: 'm oveset',
      headerName: 'Moveset',
      type: 'list',
      width: 300,
      editable: true
    }
  ];

  // const rows = [
  //   { id: 1, Name: 'Charmander', Type: 'fire', Height: 2, Weight: 20, Moveset: ['fire-punch', ' scratch', ' ember', ' flamethrower']  },
  //   { id: 2, Name: 'Abra', Type: 'Psychic', Height: 42, Weight: 20, Moveset: ['psychic', ' teleport', ' psybeam', ' confusion']  },
  //   { id: 3, Name: 'Squirtle', Type: 'Water', Height: 20, Weight: 40, Moveset: ['water-gun', ' withdraw', ' bubblebeam', ' scratch'] },
  //   { id: 4, Name: 'Salamence', Type: 'Dragon/Flying', Height: 200, Weight: 500, Moveset: ['Dragon Rage', ' Hyperbeam', ' Dragon Claw', ' Aerial Ace'] },
  //   { id: 5, Name: 'Nidoking', Type: 'Ground/Poison', Height: 75, Weight: 300, Moveset: ['Fissure', ' Earthquake', ' Poisonsting', ' Horn Drill'] },
  //   { id: 6, Name: 'Mewtwo', Type: 'Psychic', Height: 150, Weight: 200, Moveset: ['psychic', ' Recover', ' psybeam', ' Psystrike'] },
  //   { id: 7, Name: 'Volcarona', Type: 'Fire/Bug', Height: 44, Weight: 20, Moveset: ['Flare Blitz', ' Fire Blast', ' Heat Wave', ' Quiver Dance'] },
  //   { id: 8, Name: 'Ampharos', Type: 'Electric', Height: 36, Weight: 20, Moveset: ['Thunder', ' Charge Beam', ' Thunder Wave', ' Thunder Punch'] },
  //   { id: 9, Name: 'Venusaur', Type: 'Grass', Height: 65, Weight: 20, Moveset: ['Solar Beam', ' Synthesis', ' Double-Edge', ' Leech Seed'] },
  // ];

interface gridData{
  data:{
    id?:string;
  }
}



export const DataTable = () => {
  let { pokemonData, getData } = useGetData()
  let [open, setOpen] = useState(false)
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () =>{
    setOpen(true)
  }
  let handleClose = () =>{
    setOpen(false)
  }
  let deleteData = () =>{
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }
    return(
        <div style={{ height: 400, width:'100%' }}>
            <h2>Pokemon in Your Team!</h2>
            <DataGrid
                rows={pokemonData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel); }}
                {...pokemonData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Pokemon</DialogTitle>
              <DialogContentText>Pokemon Id: {gridData[0]}</DialogContentText>
              <PokemonForm id={`${gridData[0]}`}/>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="secondary">Done</Button>
              </DialogActions>
            </Dialog>
        </div>
    ); 
}
