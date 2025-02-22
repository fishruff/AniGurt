interface PlayerProps {
    urlPlayer: string | undefined;
  }
  const Player: React.FC<PlayerProps> = ({ urlPlayer }) => {    
    return ( 
        <div className="flex justify-around mt-20">
            <iframe className=" rounded-2xl" src={urlPlayer} width="910px" height="570px" allowFullScreen></iframe>
            <iframe className=" rounded-2xl" src="https://html5.gamedistribution.com/da854bd614dd4fcbb4a4e9da90b4ad48/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}" width="320" height="570"></iframe>
        </div>
     );
}

export default Player;