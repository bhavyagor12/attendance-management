
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
    return content;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "internal error",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};
