class EliminarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, id: int):
        return self.repository.eliminar(id)