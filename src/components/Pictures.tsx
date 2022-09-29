import React from 'react';
import { server } from './constants';


export function Pictures(props: any) {
    if (props.details == null || props.details.pictures == null || props.details.pictures.length == 0) {
        return null;
    }

    return (
        <table className="table">
            {props.details.pictures.map((item: any) => {
                return(
                <tr>
                    <td>
                        <a href={server + '/pictures/' + item.PictureName}>
                                <img src={server + '/pictures/' + item.PictureName} alt={item.AltText} width="250" height="250" />
                        </a>
                    </td>
                    </tr>
                    )   
            })
            }
        </table>
        
        )
}

