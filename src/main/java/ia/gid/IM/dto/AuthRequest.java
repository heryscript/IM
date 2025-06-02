package ia.gid.IM.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
