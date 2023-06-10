import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allTypes, createPoke } from "../../redux/actions";
import style from "./Form.module.css"
import { useHistory } from "react-router-dom";


const Form = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: []
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    weight: "",
    height: "",
    speed: "",
    defense: "",
    attack: "",
    type:""
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  
  React.useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);
  

  const types = useSelector(state=>state.pokeTypes) // Replace with your list of Pokémon types

  const changeHandler = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const selectedTypes = form.type;

      if (event.target.checked) {
        if (selectedTypes.length < 2) {
          setForm((prevForm) => ({
            ...prevForm,
            type: [...prevForm.type, value],
          }));
        }
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          type: prevForm.type.filter((type) => type !== value),
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }

    validate(name, value); // Llamada a la función validate

   // console.log(form);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    validate();
    if (!isFormComplete) {
      return;
    }
  
    // Convertir el nombre a minúscula
    const lowercaseForm = {
      ...form,
      name: form.name.toLowerCase()
    };
  
    try {
      await dispatch(createPoke(lowercaseForm)); // Llama a la acción createPoke con lowercaseForm como argumento
      alert("created successfully!!");
      history.push("/home"); // Redirigir a la página "/home"
    } catch (error) {
      console.error(error);
      alert("Some field is empty or incorrect.");
    }
  };

  const validate = (property, value) => {
    const newErrors = { ...errors };
    let isComplete = true;

    if (property === "name") {
      if (!value) {
        newErrors.name = "Name is required";
      } else if (!/^[a-zA-Z]{3,10}$/.test(value)) {
        newErrors.name =
          "The name must have from 3 to 10 characters. And they can only be letters";
      } else {
        newErrors.name = "";
      }
    } else if (property === "hp") {
      if (!value) {
        newErrors.hp = "Hp is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.hp =
          "The hp can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.hp = "";
      }
    } else if (property === "weight") {
      if (!value) {
        newErrors.weight = "Weight is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.weight =
          "The weight can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.weight = "";
      }
    } else if (property === "height") {
      if (!value) {
        newErrors.height = "Height is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.height =
          "The height can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.height = "";
      }
    } else if (property === "speed") {
      if (!value) {
        newErrors.speed = "Speed is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.speed =
          "The speed can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.speed = "";
      }
    } else if (property === "defense") {
      if (!value) {
        newErrors.defense = "Defense is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.defense =
          "The defense can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.defense = "";
      }
    } else if (property === "attack") {
      if (!value) {
        newErrors.attack = "Attack is required";
      } else if (!/^[0-9]{1,2}$/.test(value)) {
        newErrors.attack =
          "The attack can only contain values from 0 to 99. And only numbers are allowed";
      } else {
        newErrors.attack = "";
      }
     } else if (property === "type") {
    if ((value) > 2) {
      newErrors.type = "Only can select 2 types to maximun";
    }else if (value === [] ) {
      newErrors.type = "Must to select at least 1 type";
      isComplete = false;
    } else {
      newErrors.type = "";
    }
  } else if (property === "image") {
    if (!value) {
      newErrors.image = "Image is required";
    } else if (
      !/^https?:\/\/\S+(\.png|\.jpg|\.jpeg|\.gif)$/i.test(value)
    ) {
      newErrors.image =
        "Please enter a valid image URL (ending with .png, .jpg, .jpeg, or .gif)";
    }
  }if (
    !newErrors.name &&
    !newErrors.hp &&
    !newErrors.weight &&
    !newErrors.height &&
    !newErrors.speed &&
    !newErrors.defense &&
    !newErrors.attack &&
    !newErrors.type &&
    !newErrors.image
  ) {
    isComplete = true;
  } else {
    isComplete = false;
  }

  setIsFormComplete(isComplete);
    setErrors(newErrors);
  };
  
  return (
    <form  className={style.containerCreate} onSubmit={submitHandler}>
      <h1>Create Your Pokemon!</h1>
      <div >
        <label>Name </label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Image (url) </label>
        <input type="text" value={form.image} onChange={changeHandler} name="image" />
        {errors.image && <span>{errors.image}</span>}
      </div>

      <div>
        <label>Health Points </label>
        <input type="text" value={form.hp} onChange={changeHandler} name="hp" />
        {errors.hp && <span>{errors.hp}</span>}
      </div>

      <div>
        <label>Attack </label>
        <input type="text" value={form.attack} onChange={changeHandler} name="attack" />
        {errors.attack && <span>{errors.attack}</span>}
      </div>

      <div>
        <label>Defense </label>
        <input type="text" value={form.defense} onChange={changeHandler} name="defense" />
        {errors.defense && <span>{errors.defense}</span>}
      </div>

      <div>
        <label>Speed </label>
        <input type="text" value={form.speed} onChange={changeHandler} name="speed" />
        {errors.speed && <span>{errors.speed}</span>}
      </div>

      <div>
        <label>Height </label>
        <input type="text" value={form.height} onChange={changeHandler} name="height" />
        {errors.height && <span>{errors.height}</span>}
      </div>

      <div>
        <label>Weight </label>
        <input type="text" value={form.weight} onChange={changeHandler} name="weight" />
        {errors.weight && <span>{errors.weight}</span>}
      </div>

      <div>
  <label>Types</label>
  {
  types?.map((type) => (
    <div key={type.id}>
      <label>
        {type.name}
        <input
          type="checkbox"
          value={type.id}
          onChange={changeHandler}
          checked={form.type.includes(type.id)}
        />
      </label>
    </div>
  ))}
{errors.type && <span>{errors.type}</span>}
</div>

<button type="submit" disabled={!isFormComplete}>
        Submit
        </button>
    </form>
  );
};

export default Form;