package com.__105.Banchan.auth.service;

public interface TokenBlacklistService {
    void blacklistToken(String token);
    boolean isTokenBlacklisted(String token);
}
