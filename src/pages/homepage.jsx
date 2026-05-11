import { useNavigate } from "react-router-dom";
import "../App.css";

export default function HomePage() {
  const navigate = useNavigate();

  const toggleSteps = () => {
    const steps = document.getElementById("steps");

    if (steps.style.display === "none" || steps.style.display === "") {
      steps.style.display = "block";
    } else {
      steps.style.display = "none";
    }
  };

  return (
    <>
      <header>
        <h1>Pet Adoption Center</h1>
        <p>Find your new best friend!</p>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#pets">Pets</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <section id="home" className="home">
          <h2>Adopt a Pet</h2>

          <p>
            Many wonderful animals are waiting for a loving home.
          </p>

          <img src="/images/dogs.png" alt="Dogs" />
          <img src="/images/kittens.jpg" alt="Kittens" />
        </section>

        <section id="about">
          <h2>About Our Shelter</h2>

          <p>
            Our shelter helps cats and dogs find new homes.
            <br />
            When people adopt a pet, they give that animal a better life and a second chance.
          </p>
        </section>

        <section id="pets">
          <h2>Pets Available for Adoption</h2>

          <div className="pet-container">

            <div className="pet-card">
              <img src="/images/behlül.jpg" alt="Dog" />
              <h3>Behlül</h3>

              <p>
                Age: 5 <br />
                Male <br />
                Neutered <br />
                Vaccinations up to date.
              </p>
            </div>

            <div className="pet-card">
              <img src="/images/oreo.png" alt="Cat" />
              <h3>Oreo</h3>

              <p>
                Age: 3 <br />
                Female <br />
                Spayed <br />
                Looking for a new home.
              </p>
            </div>

            <div className="pet-card">
              <img src="/images/safinaz.jpg" alt="Kitten" />
              <h3>Safinaz</h3>

              <p>
                Age: 2 months <br />
                Female <br />
                Not spayed <br />
                Litter trained
              </p>
            </div>

          </div>

          <button onClick={toggleSteps}>
            Show Adoption Steps
          </button>

          <p id="steps">
            1. Browse available pets <br />
            2. Submit an adoption application <br />
            3. Shelter reviews your application <br />
            4. Meet the pet <br />
            5. Complete the adoption
          </p>
        </section>

        <section id="contact">
          <h2>Contact Us</h2>

          <p>Email: happytails@email.com</p>
          <p>Phone: +90 512 345 6789</p>
        </section>
      </main>

      <footer>
        <p>© 2026 Pet Adoption Center</p>
        <p>Adopt love. Save a life.</p>
      </footer>
    </>
    
  );
}