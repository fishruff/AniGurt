interface PlayerProps {
    urlPlayer: string | undefined;
  }
  const Player: React.FC<PlayerProps> = ({ urlPlayer }) => {    
    return ( 
        <div className="flex justify-around mt-20 mb-20">
            <iframe className=" rounded-2xl" src={urlPlayer} width="910px" height="570px" allowFullScreen></iframe>
            <iframe className="rounded-2xl" src="https://www.crazygames.com/embed/blockbuster-puzzle" allow="gamepad *;"></iframe>
        </div>
     );
}

export default Player;