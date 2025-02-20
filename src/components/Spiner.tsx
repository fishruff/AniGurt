function Spiner() {
    return ( 
        <div className="fixed inset-0 flex flex-col justify-center items-center">
  <div className="w-12 h-12 border-4 border-amber-50 border-solid rounded-full animate-spin border-t-transparent"></div>
  <div className="text-amber-50 mt-2">
   <p>Загрузка...</p>
  </div>
</div>
     );
}

export default Spiner;