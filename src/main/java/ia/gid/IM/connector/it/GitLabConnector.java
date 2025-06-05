package ia.gid.IM.connector.it;

import ia.gid.IM.entity.Contributor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GitLabConnector {

    @Value("${connectors.gitlab.token}")
    private String gitlabToken;

    @Value("${connectors.gitlab.url}")
    private String gitlabUrl; // ex: https://gitlab.com ou https://gitlab.monentreprise.local

    private final RestTemplate restTemplate = new RestTemplate();

    public void provision(Contributor contributor) {
        String apiUrl = gitlabUrl + "/api/v4/users";

        HttpHeaders headers = new HttpHeaders();
        headers.set("PRIVATE-TOKEN", gitlabToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("email", contributor.getEmail());
        body.put("username", contributor.getEmail().split("@")[0]);
        body.put("name", contributor.getLastname() + " " + contributor.getFirstname());
        body.put("password", "P@ssw0rd123"); // à adapter / générer dynamiquement
        body.put("skip_confirmation", true);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        restTemplate.postForEntity(apiUrl, request, String.class);
    }

    public void deprovision(Contributor contributor) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("PRIVATE-TOKEN", gitlabToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 1. Recherche l'utilisateur par email pour récupérer l'ID
        String searchUrl = gitlabUrl + "/api/v4/users?search=" + contributor.getEmail();

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Contributor[]> response = restTemplate.exchange(
                searchUrl, HttpMethod.GET, requestEntity, Contributor[].class);

        Contributor[] users = response.getBody();

        if (users == null || users.length == 0) {
            throw new IllegalArgumentException("Utilisateur GitLab non trouvé pour l'email : " + contributor.getEmail());
        }

        // Supposons que le premier utilisateur est le bon
        Long userId = users[0].getId();

        // 2. Supprime l'utilisateur par ID
        String deleteUrl = gitlabUrl + "/api/v4/users/" + userId;

        restTemplate.exchange(deleteUrl, HttpMethod.DELETE, requestEntity, Void.class);
    }

}
