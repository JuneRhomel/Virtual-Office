async function saveData(_props : string) {
    console.log(_props);
    let response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: _props,
    });
    const responseData = await response.json();
    const token = responseData.token;
    localStorage.setItem("token", token);
    return responseData;
}

export default saveData;
