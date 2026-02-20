class EliminarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int):
        return self.repository.eliminar(id)