export function handleKeyPress(event: any) {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  const regex = /^[0-9]+$/;

  if (!regex.test(keyValue)) {
    event.preventDefault();
  }
};