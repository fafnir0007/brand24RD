import {
    createStyles,
  } from '@mantine/core';


  export default createStyles((theme) => ({
    root:{
      display:'flex',
      flexDirection: 'row',
      justifyContent:'space-between',
      borderWidth:'1px',
      borderLeftColor:'1px'
    },
    accordionSection:{
      width:'68rem'
    },
    checkBoxSection:{
      display:'flex',
      flexDirection:'column',
      width: '15rem',
      borderLeft: '0.0625rem solid #dee2e6',
      paddingLeft:'1rem'

    },
    sideBartitle:{
      paddingBottom:'1rem',
      marginTop: '1rem'
    }
    
  }));