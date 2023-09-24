import { Card } from 'primereact/card';
// import { Image } from 'primereact/image';
import './CardHome.css';
import homeImage from "../../assets/Images/board_games.svg"

export default function CardHome() {

    const footer = (
        // <img alt="BoardGames" src="/Users/alishahome/Documents/Software_Engineering/Code_Platoon/Assessments/Group_Project/game-night/frontend/src/assets/Images/stacked_board_games.png"/>
        <img alt="BoardGames" src= {homeImage}/>
    );
    
    return (
        <div className="card-center">
            <Card footer = {footer}>
                <p className='ssfont'>GameNight welcomes all board game, card game, dice, DnD, and other game enthusiasts! Our site makes it easy to plan the perfect game night! Create a private game night with just your close-knit friends, or create and search for public games in your area. Use the calendar and chatroom to make communication and scheduling a piece of cake! Lets play!</p>
                {/* <Image src= "/Users/alishahome/Documents/Software_Engineering/Code_Platoon/Assessments/Group_Project/game-night/frontend/src/assets/Images/stacked_board_games.png" className='boardgames-image' preview = 'false' /> */}
            </Card>
        </div>
    )   
}

