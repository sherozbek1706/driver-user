import "./empty.css";
export const Empty = () => {
  return (
    <div className="Empty">
      <i className="fa-regular fa-folder-open icon"></i>
      <h1 className="Empty__title">Buyurtmalar tarixi bo'sh!</h1>
      <p className="Empty__text">
        Sizning buyurtmalaringiz joylashgan bo'lim hozirda bo'sh. Buyurtmalar
        yo'q! Tezroq buyurtma bering 😊.
      </p>
    </div>
  );
};
