// Concernant useEffect :

// Pour bien comprendre :

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  // attention ici this.state est une props ?

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  // cette fonction se lance une fois a la fin de la sortie du composant
  // elle demande au navigateur de lancer tick() toutes les secondes

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  // tick() est lancée toutes les secondes, et avec un setState, provoque un nouveau rendu car modifie une props

  render() {
    return (
      <div>
        <h1>Bonjour, monde !</h1>
        <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));

import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Vous avez cliqué ${count} fois`;
  });

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </div>
  );
}
