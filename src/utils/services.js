
import Swal from "sweetalert2";

export const Login = async (userData) => {
  try {
    const rawResponse = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const content = await rawResponse.json();
    let info=null
    if (content!=="AuthError") {
        info=({
        sap_id: content.sap_id,
        name: content.name,
        ID: content.ID,
      });
    }
    else {
      Swal.fire({
        title: "Error!",
        text: "Entered credentials dont exist",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
    return info;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "internal error",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};
