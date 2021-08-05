namespace backend.Dtos.Candidate
{
    public class UpdateCandidateDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = "teste@teste.pt";
        public string Name { get; set; } = "João Teste";
        public string Phone { get; set; } = "999999999";
        public string address { get; set; } = "Rua do TEste";

    }
}