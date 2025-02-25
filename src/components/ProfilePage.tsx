function ProfilePage() {
  return (
    <div className="">
      <div className="w-full h-100">
        <img
          className="w-full h-100 object-cover"
          src="https://i.pinimg.com/originals/05/9d/5d/059d5d88f262e1b9a2db527111e89426.gif"
          alt=""
        />
      </div>
      <div className="w-4/5 mx-auto flex">
      <div className="text-center w-20%">
        <img
          className="w-70 h-70 rounded-full mt-[-10%]"
          src="https://i.pinimg.com/736x/dc/ac/bf/dcacbf81004d166a4288fde0c47ff855.jpg"
          alt="ava"
          />
        <h2 className="text-amber-50 text-2xl mt-5">Fish_ruff</h2>
        </div>
        <div className="text-center">
            <p>spisok</p>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
