import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.util.Base64;

public class GitHubUploader {

    // Configuración de tu repositorio en GitHub
    private static final String GITHUB_TOKEN = "TU_PERSONAL_ACCESS_TOKEN"; // Reemplaza con tu Token de GitHub
    private static final String REPO_OWNER = "tu_usuario_github";          // Reemplaza con tu usuario
    private static final String REPO_NAME = "tu_repositorio";               // Reemplaza con el nombre de tu repo

    public static void main(String[] args) {
        // Ejemplo: Subir la tarea de la Semana 1
        File archivoASubir = new File("Algoritmos_Semana1.pdf");
        String rutaEnRepositorio = "archivos/algoritmos/semana1.pdf";
        
        subirArchivoAGitHub(archivoASubir, rutaEnRepositorio);
    }

    public static void subirArchivoAGitHub(File archivo, String rutaDestino) {
        try {
            if (!archivo.exists()) {
                System.err.println("El archivo no existe en la ruta especificada.");
                return;
            }

            // 1. Leer el archivo y convertirlo a Base64
            byte[] fileContent = Files.readAllBytes(archivo.toPath());
            String encodedContent = Base64.getEncoder().encodeToString(fileContent);

            // 2. Construir la URL de la API de GitHub
            String url = String.format("https://api.github.com/repos/%s/%s/contents/%s",
                    REPO_OWNER, REPO_NAME, rutaDestino);

            // 3. Crear el JSON para el cuerpo de la petición
            String jsonPayload = String.format(
                "{" +
                    "\"message\": \"Subida de entregable: %s\"," +
                    "\"content\": \"%s\"" +
                "}", archivo.getName(), encodedContent);

            // 4. Configurar la petición HTTP (PUT)
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Bearer " + GITHUB_TOKEN)
                    .header("Accept", "application/vnd.github+json")
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            // 5. Enviar la petición
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                System.out.println("✅ Archivo subido exitosamente a GitHub: " + rutaDestino);
            } else {
                System.err.println("❌ Error al subir el archivo. Código de respuesta: " + response.statusCode());
                System.err.println("Detalles: " + response.body());
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
