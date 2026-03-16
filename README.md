# 🔐 Chmod Practice – Linux Permissions Web Challenge

![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![Category](https://img.shields.io/badge/category-linux_permissions-blue)
![Type](https://img.shields.io/badge/type-web_challenge-orange)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-educational-lightgrey)


An interactive web-based cybersecurity challenge designed to help users understand and practice Linux file permissions using numeric chmod.
The project introduces the fundamentals of Linux permission management and concludes with a small CTF-style challenge where participants must apply what they have learned to retrieve a hidden flag.

🔗 Live Challenge
https://fran0x4b.github.io/chmod-practice

---

## 📚 Overview

Linux file permissions are a fundamental part of **system security and access control**. Misconfigured permissions can lead to unauthorized access, data exposure, or privilege escalation.

This project provides a **hands-on learning environment** where users can practice modifying file permissions using numeric `chmod` notation.

The challenge is structured in **two stages**:

1. Permission training levels  
2. A final CTF-style challenge

---

## 🧩 Challenge Structure

### Stage 1 — Permission Training (10 Levels)

The first part of the challenge consists of **10 progressive levels** focused on learning numeric `chmod`.

Each level starts from the base permission model:

**`-rwxrwxrwx`**

Participants must convert the required permission configuration into **numeric chmod format** (e.g. `755`, `644`, etc.) in order to complete the level.

This stage helps users understand:

- the meaning of **read, write, execute**
- permission groups (**owner, group, others**)
- numeric permission representation
- how `chmod` modifies file access

### 🏴 Stage 2 — CTF Challenge

After completing the 10 training levels, the final **CTF challenge** is unlocked.

In this stage, users must explore a simulated filesystem and retrieve a hidden flag.

Participants can use a limited set of Linux commands:

| Command | Description |
|--------|-------------|
| `ls` | list files in the directory |
| `ls -la` | list all files including hidden ones |
| `cat <file>` | read file contents |
| `chmod <permissions> <file>` | change file permissions |

The objective is to:

1. discover hidden files  
2. analyze their permissions  
3. modify permissions where necessary  
4. read the correct file and retrieve the flag  

---

## 🎯 Learning Objectives

This challenge helps users practice:

- Linux **file permission management**
- numeric `chmod` notation
- interpreting `ls -l` output
- discovering hidden files with `ls -la`
- practical **filesystem access control concepts**

---

## Security Relevance

These skills are particularly relevant for:

- 🔵 **Blue Team analysts**
- 🛡️ **SOC analysts**
- 🖥️ **system administrators**
- 🔍 **incident responders**

Incorrect permission settings are a common source of security issues such as:

- sensitive file exposure
- unauthorized access
- privilege escalation paths

This project demonstrates these concepts in a simplified environment.

---

## 🛠️ Technologies Used

- HTML  
- CSS  
- JavaScript  
- GitHub Pages  

---

# 📜 License

This project is released for **educational purposes**.

---

## 🌐 Connect with Me

💼 **LinkedIn:** [Francesco Bozzano](https://www.linkedin.com/in/francescobozzano/)  
📧 **Email:** [bozzano.francesco@proton.me](mailto:bozzano.francesco@proton.me)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0f2027&height=120&section=footer)
