const debug=(message,resultat=false)=>{

    if(process.env.DEBUG_MODE){

        if(!resultat)
            console.log(message)
        
    }

}


module.exports=debug