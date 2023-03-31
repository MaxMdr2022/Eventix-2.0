import React from "react";
import "./NavBarPerfil.css";


export default function NavBarPerfil (){


    return(

        <div className="conNavPerfil">
            <a href="/perfil"><div className="btnNBP">Perfil</div></a>
            <a href="/perfil/tickets"><div className="btnNBP">Tickets</div></a>
            <a href="/perfil/reviews"><div className="btnNBP">Comentarios</div></a>
            <a href="/perfil/eventos"><div className="btnNBP">Eventos</div></a>
            <a href="/perfil/setings"><div className="btnNBP">Configuracion</div></a>
            
        </div>
    );

};