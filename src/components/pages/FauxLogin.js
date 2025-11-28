import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";
import useLoad from "../api/useLoad.js";
import "./Pages.scss";
import "./FauxLogin.scss";

export default function Login() {
  // Initialisation ------------------------------
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  // State ---------------------------------------
  const [tradespersons, , loadingTradespersonMessage] =
    useLoad(`/users/tradesperson`);
  const [dispatchers, , loadingDispatcherMessage] =
    useLoad(`/users/dispatcher`);
  const [clients, , loadingClientMessage] = useLoad(`/users/client`);
  const [selectedUser, setSelectedUser] = useState(null);

  // Context -------------------------------------
  // Methods -------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    login(selectedUser);
    navigate(state?.path || "/");
  };

  const handleTradespersonChange = (event) =>
    setSelectedUser(tradespersons[parseInt(event.target.value)]);
  const handleDispatcherChange = (event) =>
    setSelectedUser(dispatchers[parseInt(event.target.value)]);
  const handleClientChange = (event) =>
    setSelectedUser(clients[parseInt(event.target.value)]);

  // View ----------------------------------------
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h2>... as a dispatcher</h2>
        <label>Use this dropdown to select a dispatcher</label>
        {!dispatchers ? (
          <p>{loadingDispatcherMessage}</p>
        ) : (
          <>
            <select onChange={handleDispatcherChange}>
              <option value={null}>Select dispatcher...</option>
              {dispatchers.map((user, index) => (
                <option key={user.UserID} value={index}>
                  {`${user.UserFirstName} ${user.UserLastName} (${user.UserEmail})`}
                </option>
              ))}
            </select>
          </>
        )}
        <h2>... as a tradesperson</h2>
        <label>Use this dropdown to select a tradesperson</label>
        {!tradespersons ? (
          <p>{loadingTradespersonMessage}</p>
        ) : (
          <>
            <select onChange={handleTradespersonChange}>
              <option value={null}>Select tradesperson...</option>
              {tradespersons.map((user, index) => (
                <option key={user.UserID} value={index}>
                  {`${user.UserFirstName} ${user.UserLastName} (${user.UserEmail})`}
                </option>
              ))}
            </select>
          </>
        )}
        <h2>... as a client</h2>
        <label>Use this dropdown to select a client</label>
        {!clients ? (
          <p>{loadingClientMessage}</p>
        ) : (
          <>
            <select onChange={handleClientChange}>
              <option value={null}>Select client...</option>
              {clients.map((user, index) => (
                <option key={user.UserID} value={index}>
                  {`${user.UserFirstName} ${user.UserLastName} (${user.UserEmail})`}
                </option>
              ))}
            </select>
          </>
        )}
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
