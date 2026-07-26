// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IjazahVerifier
 * @dev Smart Contract untuk menerbitkan dan memverifikasi ijazah berbasis blockchain BOT Chain (EVM).
 */
contract IjazahVerifier {
    address public owner;

    struct Diploma {
        string diplomaNumber;
        string studentName;
        string major;
        string degree;
        uint16 graduationYear;
        uint256 issueDate;
        address issuer;
        bool isValid;
    }

    // Mapping dari Nomor Ijazah ke Struct Diploma
    mapping(string => Diploma) public diplomas;

    // Array menyimpan seluruh Nomor Ijazah untuk kemudahan listing di Admin Dashboard
    string[] public diplomaNumbers;

    // Events
    event DiplomaIssued(
        string indexed diplomaNumberHash,
        string diplomaNumber,
        string studentName,
        string major,
        string degree,
        uint16 graduationYear,
        uint256 issueDate,
        address issuer
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya Admin / Owner yang berhak melakukan tindakan ini");
        _;
    }

    /**
     * @dev Menerbitkan ijazah baru (Hanya Admin)
     */
    function issueDiploma(
        string memory diplomaNumber,
        string memory studentName,
        string memory major,
        string memory degree,
        uint16 graduationYear
    ) public onlyOwner {
        require(bytes(diplomaNumber).length > 0, "Nomor ijazah tidak boleh kosong");
        require(bytes(studentName).length > 0, "Nama siswa tidak boleh kosong");
        require(!diplomas[diplomaNumber].isValid, "Ijazah dengan nomor ini sudah diterbitkan");

        Diploma memory newDiploma = Diploma({
            diplomaNumber: diplomaNumber,
            studentName: studentName,
            major: major,
            degree: degree,
            graduationYear: graduationYear,
            issueDate: block.timestamp,
            issuer: msg.sender,
            isValid: true
        });

        diplomas[diplomaNumber] = newDiploma;
        diplomaNumbers.push(diplomaNumber);

        emit DiplomaIssued(
            string(abi.encodePacked(keccak256(bytes(diplomaNumber)))),
            diplomaNumber,
            studentName,
            major,
            degree,
            graduationYear,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @dev Memverifikasi apakah ijazah valid dan mengembalikan data lengkapnya
     */
    function verifyDiploma(string memory diplomaNumber)
        public
        view
        returns (
            bool isValid,
            string memory studentName,
            string memory major,
            string memory degree,
            uint16 graduationYear,
            uint256 issueDate,
            address issuer
        )
    {
        Diploma memory cert = diplomas[diplomaNumber];
        return (
            cert.isValid,
            cert.studentName,
            cert.major,
            cert.degree,
            cert.graduationYear,
            cert.issueDate,
            cert.issuer
        );
    }

    /**
     * @dev Mengambil struct Diploma lengkap berdasarkan Nomor Ijazah
     */
    function getDiploma(string memory diplomaNumber) public view returns (Diploma memory) {
        require(diplomas[diplomaNumber].isValid, "Ijazah tidak ditemukan atau tidak valid");
        return diplomas[diplomaNumber];
    }

    /**
     * @dev Mengembalikan jumlah total ijazah yang sudah diterbitkan
     */
    function getDiplomaCount() public view returns (uint256) {
        return diplomaNumbers.length;
    }

    /**
     * @dev Mengembalikan seluruh list Nomor Ijazah (untuk kebutuhan Admin Dashboard)
     */
    function getAllDiplomaNumbers() public view returns (string[] memory) {
        return diplomaNumbers;
    }
}
