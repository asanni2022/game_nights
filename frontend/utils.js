import axios from "axios";
//this function is outside of App component b/c really has nothing to do with react, just grabbing the csrf value
// there is also a django function for this in the docs.
//this does not grab the session id b/c session id is http only so cant be accessed via JS.
const getCSRFToken = () => {
	let csrfToken;

	// the browser's cookies for this page are all in one string, separated by semi-colons

	const cookies = document.cookie.split(";");
	for (let cookie of cookies) {
		// individual cookies have their key and value separated by an equal sign
		const crumbs = cookie.split("=");
		if (crumbs[0].trim() === "csrftoken") {
			csrfToken = crumbs[1];
		}
	}
	return csrfToken;
};
axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

export default getCSRFToken;

// by setting this as a default whenever we send axios request it will have csrf token as a header so django will accept post requests
