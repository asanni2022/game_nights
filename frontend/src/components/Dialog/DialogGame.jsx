import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useEffect } from 'react'
import "./DialogGame.css"

export default function DialogGame({gameInfo, displayBasic2, setDisplayBasic2}) {

    useEffect(() => {
        console.log('gameInfo', gameInfo)
    }, [])

    const onHide = () => {
        setDisplayBasic2(false);
    }


    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Return" icon="pi pi-check" onClick={() => setDisplayBasic2(false)} autoFocus />
            </div>
        );
    }

    return (
        <>
        {gameInfo.data.games[0].description_preview == "" ?
            <Dialog header={gameInfo.data.games[0].name} visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')}>
                <p>No information available on this game.</p>
            </Dialog>
        :
            <Dialog header={gameInfo.data.games[0].name} visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={onHide}>
                <img src={gameInfo.data.games[0].thumb_url} alt="Game Image" width="300" height="200"></img>
                <h5 style={{'margin-top': '12px'}}>Description</h5>
                <p>{gameInfo.data.games[0].description_preview}</p>
                <br></br>
                <a href={gameInfo.data.games[0].url} target="_blank">More Info?</a>
            </Dialog>
        }
        </>
    )
}