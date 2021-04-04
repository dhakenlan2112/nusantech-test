import React from "react";
import "./App.css";
import Input from "@material-ui/core/Input";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const initialValues = [
  {
    fieldId: "field1",
    label: "Field 1",
    value: "",
    checked: false,
  },
  {
    fieldId: "field2",
    label: "Field 2",
    value: "",
    checked: false,
  },
  {
    fieldId: "field3",
    label: "Field 3",
    value: "",
    checked: false,
  },
];

const initialResult = "Hasil akan muncul disini";

function App() {
  const [fields, setField] = React.useState(initialValues);

  const [operator, setOp] = React.useState(null);

  const [finalResult, setFinalResult] = React.useState(initialResult);

  const handleInputChanges = (e) => {
    setField((prevState) => {
      let index = prevState.findIndex(
        (el) => el.fieldId === e.target.attributes.id.value
      );
      let tmp = [...prevState];
      tmp[index] = {
        ...tmp[index],
        value: e.target.value,
      };
      return tmp;
    });
  };

  const handleCheckboxChanges = (e) => {
    setField((prevState) => {
      let index = prevState.findIndex(
        (el) => el.fieldId === e.target.attributes.id.value
      );
      let tmp = [...prevState];
      tmp[index] = {
        ...tmp[index],
        checked: !tmp[index].checked,
      };
      return tmp;
    });
  };

  const handleChangeOp = (event, newOp) => {
    setOp(newOp);
  };

  const handleReset = () => {
    setField(initialValues);
    setFinalResult(initialResult);
    setOp(null);
  };

  const handleSubmit = () => {
    let values = getValues();
    if (values.operationAllowed && operator) {
      const toCount = values.toCount.map((val) => val.value);
      switch (operator) {
        case "plus":
          setFinalResult(
            `${toCount.join("+")} = ${toCount.reduce(
              (a, b) => Number(a) + Number(b),
              0
            )}`
          );
          break;
        case "min":
          setFinalResult(
            `${toCount.join("-")} = ${toCount.reduce(
              (a, b) => Number(a) - Number(b)
            )}`
          );
          break;
        case "divide":
          setFinalResult(
            `${toCount.join("/")} = ${toCount.reduce(
              (a, b) => Number(a) / Number(b)
            )}`
          );
          break;
        case "times":
          setFinalResult(
            `${toCount.join("x")} = ${toCount.reduce(
              (a, b) => Number(a) * Number(b)
            )}`
          );
          break;
        default:
          console.log("default operation");
      }
    } else {
      alert(
        "Silahkan centang minimal 2, isi semua field, dan pilih salah satu operator"
      );
    }
  };

  const getValues = () => {
    const fieldCandidate = fields.filter((field) => field.checked);
    const valuesNotEmpty = fieldCandidate.filter((field) => field.value);
    const operationAllowed = valuesNotEmpty.length > 1;
    return {
      toCount: valuesNotEmpty,
      operationAllowed: operationAllowed,
    };
  };

  React.useEffect(() => {
    console.log("fields", fields);
  }, [fields]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <h1>Nusantech Test</h1>
          <div style={{ marginBottom: "16px" }}>
            {fields.map((field) => (
              <div>
                <Input
                  id={field.fieldId}
                  label={field.label}
                  value={field.value}
                  onChange={handleInputChanges}
                  type="number"
                  placeholder={field.label}
                />
                <Checkbox
                  id={field.fieldId}
                  checked={field.checked}
                  onChange={handleCheckboxChanges}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <ToggleButtonGroup
              size="medium"
              value={operator}
              exclusive
              onChange={handleChangeOp}
            >
              <ToggleButton value="plus">+</ToggleButton>
              <ToggleButton value="min">-</ToggleButton>
              <ToggleButton value="divide">/</ToggleButton>
              <ToggleButton value="times">x</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ width: 300, margin: "0 auto" }}>
            <div style={{ marginBottom: 16 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleReset}
                style={{ marginRight: 4, marginLeft: 4 }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                style={{ marginRight: 4, marginLeft: 4 }}
              >
                Hitung
              </Button>
            </div>
            <Card>
              <CardContent>
                <small>Hasil</small>
                <div>
                  <strong>{finalResult}</strong>
                </div>
              </CardContent>
            </Card>
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
