
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
// import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

import com.grocery.business.SpringInfraConfig;
import com.grocery.business.domain.repository.ProductDAO;
import com.grocery.business.domain.dto.ProductRequest;
import com.grocery.business.domain.repository.SpringDomainRepositoryConfig;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;


@ContextConfiguration(classes = { SpringDomainRepositoryConfig.class, SpringInfraConfig.class })
public class RepositoryTest  extends AbstractTransactionalTestNGSpringContextTests {
    
    @Autowired
    private ProductDAO productDao;

    @Test
    public void testAddProduct() throws Exception {
        
        ProductRequest pr = new ProductRequest();
        pr.setName("Kaki");
        pr.setCategory(ProductCategory.ALCOHOL);
        pr.setQuantityType(QuantityType.KG);
        
        productDao.addProduct("d271397f084242e1b4b7d0d840cbadf7", pr);

    }
}
