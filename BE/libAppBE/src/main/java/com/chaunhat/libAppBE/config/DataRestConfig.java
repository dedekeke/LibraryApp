package com.chaunhat.libAppBE.config;


import com.chaunhat.libAppBE.entity.Book;
import com.chaunhat.libAppBE.entity.Message;
import com.chaunhat.libAppBE.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private final String allowedOrigin = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);
        disableHttpMethod(Book.class, config, unsupportedActions);
        disableHttpMethod(Review.class, config, unsupportedActions);
        disableHttpMethod(Message.class, config, unsupportedActions);

        /* Configure CORS Mapping*/
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigin);
    }

    private void disableHttpMethod(Class T, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(T)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
}
