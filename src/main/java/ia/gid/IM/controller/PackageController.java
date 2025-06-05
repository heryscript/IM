package ia.gid.IM.controller;

import ia.gid.IM.entity.PackageProvision;
import ia.gid.IM.service.PackageProvisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {
    private final PackageProvisionService packageProvisionService;

    @GetMapping
    public List<PackageProvision> getPackages() {
        return packageProvisionService.findAll();
    }

    @GetMapping("{packageId}")
    public PackageProvision getPackage(@PathVariable long packageId) {
        return packageProvisionService.findById(packageId);
    }

    @PostMapping
    public PackageProvision createPackage(@RequestBody PackageProvision packageProvision) {
        return packageProvisionService.save(packageProvision);
    }

    @PutMapping("{packageId}")
    public PackageProvision updatePackage(@PathVariable long packageId, @RequestBody PackageProvision packageProvision) {
        return packageProvisionService.update(packageId, packageProvision);
    }

    @DeleteMapping("{packageId}")
    public void deletePackage(@PathVariable long packageId) {
        packageProvisionService.deleteById(packageId);
    }
}
