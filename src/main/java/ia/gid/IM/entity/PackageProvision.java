package ia.gid.IM.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class PackageProvision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> connecteurs;
}
