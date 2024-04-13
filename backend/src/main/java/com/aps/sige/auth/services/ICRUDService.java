package com.aps.sige.auth.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICRUDService {

    public interface SaveService<T> {
        T save(T entity);
    }
    
    public interface UpdateService<T> {
        T update(Long id, T entity);
    }
    
    public interface FindService<T> {
        T findById(Long id);
        Page<T> findAllPaged(Pageable pageable);
    }
    
    public interface DeleteService {
        void delete(Long id);
    }
    
}
