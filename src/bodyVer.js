const bodyVer = (
  <div>
    <Modal.Header>
      <Modal.Title>Ver Carro</Modal.Title>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        onClick={() => abrirCerrarModalVer()}
      ></button>
    </Modal.Header>
    <ModalBody>
      <table className="table table-bordered table-sm">
        <thead className="table-primary">
          <tr>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Year</th>
            <th scope="col">Cilindrada</th>
            <th scope="col">Procedencia</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody class="table-secondary table-group-divider">
          <tr>
            <td scope="row">{carsSeleccionada.marca}</td>
            <td>{carsSeleccionada.modelo}</td>
            <td>{carsSeleccionada.year}</td>
            <td>{carsSeleccionada.cilindrada}</td>
            <td>{carsSeleccionada.procedencia}</td>
            <td>{carsSeleccionada.precio}</td>
          </tr>
        </tbody>
      </table>

      <h5>
        Imagenes del {carsSeleccionada.marca} {carsSeleccionada.modelo}
      </h5>

      <div
        id="carouselExampleCaptions"
        className="carousel carousel-dark slide"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={carsSeleccionada.pic1}
              className="d-block w-100"
              alt={carsSeleccionada.pic1}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Marca: {carsSeleccionada.marca} </h5>
              <p>Modelo: {carsSeleccionada.modelo}</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={carsSeleccionada.pic2}
              className="d-block w-100"
              alt={carsSeleccionada.pic2}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Marca: {carsSeleccionada.marca} </h5>
              <p>Modelo: {carsSeleccionada.modelo}</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </ModalBody>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => abrirCerrarModalVer()}>
        Cancelar
      </Button>
    </Modal.Footer>
  </div>
);
