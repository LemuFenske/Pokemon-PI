export const validate = (form, setErrors, errors) => {
    let newErrors = { ...errors };
  
    if (!form.name.length) {
      newErrors = { ...newErrors, name: '*' };
    } else if (!/^[a-zA-Z]{1,20}$/.test(form.name)) {
      newErrors = { ...newErrors, name: '*' };
    } else {
      newErrors = { ...newErrors, name: '' };
    }
  
    if (!form.image.length) {
      newErrors = { ...newErrors, image: '*' };
    } else {
      newErrors = { ...newErrors, image: '' };
    }

    if (!form.attack.length) {
        newErrors = { ...newErrors, attack: '*' };
    } else {
        newErrors = { ...newErrors, attack: '' };
    }

    if (!form.defense.length) {
        newErrors = { ...newErrors, defense: '*' };
    } else {
        newErrors = { ...newErrors, defense: '' };
    }
    
    if (!form.hp.length) {
        newErrors = { ...newErrors, hp: '*' };
    } else {
        newErrors = { ...newErrors, hp: '' };
    }
  
    setErrors(newErrors);
  };