---
title: "Rust for Frontend Developers"  
date: "2025-01-12"  
description: "Why JavaScript devs are learning Rust in 2025"  
createdBy: "Diego Morales"  
---

## Why Rust?  
- Blazing fast WebAssembly compilation  
- Memory safety guarantees  
- Growing ecosystem (Leptos, Yew frameworks)  

### JS vs Rust Example:  
JavaScript  
```javascript
function sumArray(arr) {  
  return arr.reduce((a,b) => a + b, 0);  
}  
```  

Rust  
```rust
fn sum_array(arr: &[i32]) -> i32 {  
  arr.iter().sum()  
}  
```  
