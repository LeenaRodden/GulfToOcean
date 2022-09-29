import React from 'react';
import { server } from './constants';

export function UploadedBeachImages(props: any) {
    if (props.details == null || props.details.images == null || props.details.images.length == 0) {
        return null;
    }

    return (
        <table className="table">
            {props.details.images.map((item: any) => {
                return(
                <tr>
                    <td>
                        <a href={server + '/Beach/ViewFullImage/' + item.ImageId}>
                            <img src={server + '/Beach/ViewImage/' + item.ImageId} alt={item.Picturealttext} width="250" height="250" />
                        </a>
                    </td>
                    </tr>
                    )   
            })
            }
        </table>
        
        )
}

