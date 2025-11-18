import { useAuth } from "../../context/AuthContext";

export default function PopUser() {
  const { user, logout } = useAuth();

  return (
    <div className="header__pop-user-set pop-user-set" id="user-set-target">
      <p className="pop-user-set__name">{user?.name}</p>
      <p className="pop-user-set__mail">{user?.login}</p>

      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" />
      </div>

      <button onClick={logout} type="button" className="_hover03">
        Выйти
      </button>
    </div>
  );
}
